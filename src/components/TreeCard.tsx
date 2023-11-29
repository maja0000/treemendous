import { FC } from 'react';
import Image from 'next/image';

type TreeCardProps = {
  name: string;
  species_name: string;
  image: {
    src: string;
    alt: string;
  };
  isSelected: boolean;
  onClick: () => void;
};

const TreeCard: FC<TreeCardProps> = ({
  name,
  species_name,
  image,
  isSelected,
  onClick,
}) => {
  return (
    <div className="tree-card">
      {name}
      {species_name}
      <button
        onClick={onClick}
        aria-pressed={isSelected}
        style={{
          backgroundColor: isSelected ? '#007bff' : '#ffffff',
          color: isSelected ? '#ffffff' : '#000000',
          border: '1px solid #007bff',
          padding: '8px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {`${isSelected ? 'Hide' : 'Show'} Picture`}
      </button>
      {image && isSelected && (
        <Image
          src={image.src}
          width={500}
          height={500}
          alt={image.alt}
        />
      )}
    </div>
  );
};

export default TreeCard;
