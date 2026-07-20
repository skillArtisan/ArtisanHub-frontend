import React, { useState, useEffect } from 'react';
import { Search, UserCheck } from 'lucide-react';

interface Artisan {
  publicKey: string;
  name?: string;
  verified: boolean;
  trade: string;
  completedJobs: number;
}

// Mock artisan data
const mockArtisans: Artisan[] = [
  {
    publicKey: 'GDHF...WXYZ',
    name: 'Musa Kehinde',
    verified: true,
    trade: 'Plumber',
    completedJobs: 42
  },
  {
    publicKey: 'GCPQ...ABCD',
    name: 'Efe Adebayo',
    verified: true,
    trade: 'Electrician',
    completedJobs: 38
  },
  {
    publicKey: 'GBXY...EFGH',
    name: 'Bayo Sanni',
    verified: true,
    trade: 'Carpenter',
    completedJobs: 56
  },
  {
    publicKey: 'GAKL...IJKL',
    name: 'Nneka Igwe',
    verified: true,
    trade: 'Painter',
    completedJobs: 31
  },
  {
    publicKey: 'GDEF...MNOP',
    verified: false,
    trade: 'Other',
    completedJobs: 12
  }
];

interface ArtisanSelectorProps {
  value: string;
  onChange: (publicKey: string) => void;
  error?: string;
  disabled?: boolean;
}

export function ArtisanSelector({ value, onChange, error, disabled = false }: ArtisanSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>(mockArtisans);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = mockArtisans.filter(
        (artisan) =>
          artisan.publicKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artisan.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artisan.trade.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArtisans(filtered);
    } else {
      setFilteredArtisans(mockArtisans);
    }
  }, [searchTerm]);

  const selectedArtisan = mockArtisans.find((a) => a.publicKey === value);

  return (
    <div className="form-field">
      <label htmlFor="artisan-selector" className="form-label">
        Select Artisan
        <span className="required-mark">*</span>
      </label>

      <div className="artisan-selector">
        <div className={`artisan-selector__search ${error ? 'form-input--error' : ''}`}>
          <Search size={18} className="artisan-selector__search-icon" />
          <input
            id="artisan-selector"
            type="text"
            className="artisan-selector__search-input"
            placeholder="Search by name or public key"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            disabled={disabled}
          />
        </div>

        {selectedArtisan && (
          <div className="artisan-selector__selected">
            <UserCheck size={16} />
            <span>
              {selectedArtisan.name || 'Unverified Artisan'} ({selectedArtisan.publicKey})
            </span>
            <button
              type="button"
              className="artisan-selector__clear"
              onClick={() => {
                onChange('');
                setSearchTerm('');
              }}
              disabled={disabled}
            >
              ×
            </button>
          </div>
        )}

        {isOpen && !disabled && (
          <>
            <div className="artisan-selector__backdrop" onClick={() => setIsOpen(false)} />
            <div className="artisan-selector__list">
              {filteredArtisans.length > 0 ? (
                filteredArtisans.map((artisan) => (
                  <button
                    key={artisan.publicKey}
                    type="button"
                    className="artisan-option"
                    onClick={() => {
                      onChange(artisan.publicKey);
                      setSearchTerm('');
                      setIsOpen(false);
                    }}
                  >
                    <div className="artisan-selector__info">
                      <strong>
                        {artisan.name || 'Unverified'}
                        {artisan.verified && (
                          <span className="artisan-selector__badge">
                            <UserCheck size={14} />
                          </span>
                        )}
                      </strong>
                      <span className="artisan-selector__key">{artisan.publicKey}</span>
                      <span className="artisan-selector__stats">
                        {artisan.trade} • {artisan.completedJobs} jobs
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="artisan-selector__empty">No artisans found</div>
              )}
            </div>
          </>
        )}
      </div>

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
