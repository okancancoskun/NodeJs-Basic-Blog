const Product = require("../models/product")
const fs = require('fs');
const product = require("../models/product");
module.exports.getProducts = (req, res) => {
    Product
        .find()
        .then(products => {
            res.render("admin/products.ejs", {
                title: "Admin Works",
                products: products,
                action: req.query.action,
                path: "/admin/products"

            })
        })
        .catch((err) => {
            console.log(err)
        })
}
module.exports.getAddProduct = (req, res) => {
    res.render("admin/add-product.ejs", {
        title: "New Product",
        path: "/admin/add-product"
    })
}
module.exports.postAddProduct = (req, res) => {
    const name = req.body.name;
    const file = req.file;
    const linkUrl = req.body.linkUrl;
    const description = req.body.description;
    const product = new Product({
        name: name,
        imageUrl: file.filename,
        linkUrl: linkUrl,
        description: description
    });
    product.save()
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}
module.exports.getEditProduct = (req, res) => {
    Product.findById(req.params.productid)
        .then(product => {
            res.render("admin/edit-product", {
                title: "Edit Product",
                product: product,
                path: "/admin/products"
            });
        });
}
module.exports.postEditProduct = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const linkUrl = req.body.linkUrl;
    const description = req.body.description;
    const imageUrl = req.file;

    Product.findOne({ _id: id })
        .then(product => {
            if (!product){
                return res.redirect('/')
            } 
            product.name = name;
            product.linkUrl = linkUrl;
            product.description = description;
            if (imageUrl) {
                fs.unlink('public/img/'+ product.imageUrl,err=>{
                    if(err){
                        console.log(err);
                    }
                })
                product.imageUrl = imageUrl.filename;
            }
            return product.save();

        })
        .then(result=>{res.redirect('/admin/products?action=edit')})
}

module.exports.postDeleteProduct = (req, res) => {
    const id = req.body.productid;
    Product.findOne({_id:id})
        .then(product=>{
            fs.unlink('public/img/'+ product.imageUrl,err=>{
                if(err){
                    console.log(err);
                }
            });
            return Product.deleteOne({_id:id})
        })
        .then(result=>{
            res.redirect('/admin/products?action=delete')
        })
}