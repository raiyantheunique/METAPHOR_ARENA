interface Logo3DProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo3D = ({ className = '', size = 'md' }: Logo3DProps) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`${sizeMap[size]} ${className} relative group`}>
      <img
        src="/Metaphor_logo_vector.svg"
        alt="METAPHOR ARENA Logo"
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(220, 20, 60, 0.3))',
        }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default Logo3D;

