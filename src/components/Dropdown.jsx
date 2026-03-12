/**
 * Reusable dropdown (native select) with consistent styling.
 * @param {Array<{ value: string, label: string }>} options
 * @param {string} value - Current value
 * @param {function} onChange - (e) => {} or (value) => {}
 * @param {string} [id] - For label association
 * @param {string} [name] - For form submission
 * @param {string} [label] - Visible label above the select
 * @param {string} [placeholder] - First option label when value is '' (e.g. "All statuses")
 * @param {boolean} [disabled]
 * @param {boolean} [required]
 * @param {string} [error] - Error message below
 * @param {boolean} [fullWidth=true] - Block width in forms
 * @param {string} [className] - Wrapper class
 * @param {string} [ariaLabel] - When no visible label (e.g. filter in header)
 * @param {'form'|'filter'} [variant='form'] - form = full width + label slot; filter = compact
 */
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

export default function Dropdown({
  options = [],
  value,
  onChange,
  id,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  error,
  fullWidth = true,
  className = '',
  ariaLabel,
  variant = 'form'
}) {
  const handleChange = (e) => {
    if (typeof onChange === 'function') onChange(e);
  };

  const wrapperClass = [
    'dropdown-wrap',
    variant === 'filter' ? 'dropdown-wrap--filter' : 'dropdown-wrap--form',
    fullWidth && 'dropdown-wrap--full',
    error && 'dropdown-wrap--error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className="dropdown-label">
          {label}
          {required && <span className="dropdown-required" aria-hidden> *</span>}
        </label>
      )}
      <div className="dropdown-inner">
        <select
          id={id}
          name={name}
          className="dropdown-select"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {placeholder != null && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="dropdown-chevron" aria-hidden>
          <ArrowDropDownRoundedIcon fontSize="medium" />
        </span>
      </div>
      {error && (
        <span id={id ? `${id}-error` : undefined} className="dropdown-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
