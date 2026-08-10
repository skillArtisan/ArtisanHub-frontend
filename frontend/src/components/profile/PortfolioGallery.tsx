import React, { useState } from 'react';
import {
  Plus,
  X,
  Edit2,
  Trash2,
  Upload,
  Image as ImageIcon,
  Calendar,
  Tag
} from 'lucide-react';
import { PortfolioItem, TradeSpecialization } from '../../data/mockArtisanData';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormSelect } from '../FormSelect';

const TRADE_TYPES: TradeSpecialization[] = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Welding",
  "Tiling",
  "Masonry",
  "HVAC",
  "General"
];

interface PortfolioGalleryProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (item: PortfolioItem) => void;
  onDeleteItem: (itemId: string) => void;
  onUpdateItem: (item: PortfolioItem) => void;
  isEditable?: boolean;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  portfolioItems,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  isEditable = true
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.imageUrl || !formData.category) {
      return;
    }

    if (editingId) {
      onUpdateItem({
        ...formData,
        id: editingId
      } as PortfolioItem);
    } else {
      onAddItem({
        ...formData,
        id: `port-${Date.now()}`,
        completedDate: new Date().toISOString().split('T')[0]
      } as PortfolioItem);
    }

    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
    setImagePreview(null);
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData(item);
    setImagePreview(item.imageUrl);
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div className="portfolio-gallery-container">
      <div className="portfolio-header">
        <h2>Portfolio Gallery</h2>
        {isEditable && (
          <button
            onClick={() => {
              if (!showForm) {
                resetForm();
                setShowForm(true);
              }
            }}
            className="secondary-action"
            aria-label="Add portfolio item"
          >
            <Plus size={16} />
            Add Project
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="portfolio-form-card">
          <div className="portfolio-form-header">
            <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <button
              onClick={resetForm}
              className="ghost-action"
              aria-label="Close form"
            >
              <X size={18} />
            </button>
          </div>

          <div className="portfolio-form-body">
            {/* Image Upload */}
            <div className="portfolio-image-upload">
              {imagePreview ? (
                <div className="portfolio-image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                    className="ghost-action danger-action"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="image-upload-label">
                  <Upload size={24} />
                  <span>Upload Project Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              )}
            </div>

            {/* Form Fields */}
            <FormInput
              label="Project Title"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Kitchen Renovation"
            />

            <FormTextarea
              label="Project Description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the work you did, materials used, and results..."
              rows={3}
            />

            <FormSelect
              label="Category"
              value={formData.category || 'Plumbing'}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as TradeSpecialization }))}
              options={TRADE_TYPES.map(t => ({ value: t, label: t }))}
            />

            <FormInput
              label="Completion Date"
              type="date"
              value={formData.completedDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, completedDate: e.target.value }))}
            />

            <div className="portfolio-form-actions">
              <button
                type="button"
                onClick={resetForm}
                className="secondary-action"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="primary-action"
                disabled={!formData.title || !formData.description || !formData.imageUrl || !formData.category}
              >
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="portfolio-grid">
        {portfolioItems.length === 0 ? (
          <div className="portfolio-empty-state">
            <ImageIcon size={40} />
            <p>No portfolio items yet</p>
            {isEditable && (
              <p className="text-muted">Add your completed projects to showcase your work</p>
            )}
          </div>
        ) : (
          portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-card">
              <div className="portfolio-image-container">
                <img src={item.imageUrl} alt={item.title} />
                {isEditable && (
                  <div className="portfolio-card-actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="icon-button edit-button"
                      aria-label="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="icon-button delete-button"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="portfolio-card-content">
                <h4>{item.title}</h4>
                <p className="portfolio-description">{item.description}</p>
                <div className="portfolio-card-meta">
                  <span className="portfolio-tag">
                    <Tag size={12} />
                    {item.category}
                  </span>
                  <span className="portfolio-date">
                    <Calendar size={12} />
                    {new Date(item.completedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioGallery;
