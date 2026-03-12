import { IllustrationEmpty } from './Illustrations';

/**
 * Consistent empty state with optional illustration and action.
 */
export default function EmptyState({ message = 'No items yet.', description, illustration, children }) {
  const Illo = illustration || IllustrationEmpty;
  return (
    <div className="empty-state">
      <Illo />
      <p>{message}</p>
      {description && <p style={{ fontSize: '0.9375rem', marginTop: '0.25rem' }}>{description}</p>}
      {children && <div style={{ marginTop: '1rem' }}>{children}</div>}
    </div>
  );
}
