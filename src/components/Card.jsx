export default function Card({ value, type, img, removed, onClick }) {
  return (
    <div
      className={`card ${type} ${removed ? 'removed' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {img ? (
        <img src={img} alt={value} style={{ maxWidth: '80%', maxHeight: '100%' }} />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
