import React, { useState, useEffect } from 'react'
import Header from './Header'

const ProductManager = ({ onLogout }) => {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  })

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('shineJewelProducts')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('shineJewelProducts', JSON.stringify(products))
  }, [products])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id
          ? { ...formData, id: editingProduct.id }
          : product
      )
      setProducts(updatedProducts)
      setEditingProduct(null)
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now().toString()
      }
      setProducts([...products, newProduct])
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      image: ''
    })
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    })
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId)
      setProducts(updatedProducts)
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      image: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="product-manager">
      <Header onLogout={onLogout} />
      
      <div className="product-manager-content">
        <div className="manager-header">
          <h1>Product Management</h1>
          <p>Add, edit, or remove products from your website</p>
        </div>
        
        <div className="manager-layout">
          {/* Product Form */}
          <div className="form-section">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <small>Enter a direct image URL</small>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                
                {editingProduct && (
                  <button type="button" onClick={handleCancelEdit} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Product List */}
          <div className="list-section">
            <h2>Current Products ({products.length})</h2>
            
            {products.length === 0 ? (
              <div className="empty-state">
                <p>No products added yet. Start by adding your first product!</p>
              </div>
            ) : (
              <div className="products-list">
                {products.map(product => (
                  <div key={product.id} className="product-item">
                    <div className="product-preview">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p className="product-price">{product.price}</p>
                      <p className="product-desc">{product.description}</p>
                    </div>
                    
                    <div className="product-actions">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductManager
