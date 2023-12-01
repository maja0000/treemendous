import { FC } from 'react';
import Image from 'next/image';
import treeIcon from '../assets/tree-icon.svg';
import openIcon from '../assets/close-icon.svg';

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
  const borderStyle = isSelected
    ? '1px solid #00800A'
    : '1px solid transparent';
  const toggleIconTransformStyle = isSelected
    ? 'rotate(180deg)'
    : 'rotate(0)';

  return (
    <div className="tree-card" style={{ border: borderStyle }}>
      <button
        className="tree-card-header"
        data-testid={`tree-card-button-${name}`}
        onClick={onClick}
      >
        <div className="tree-card-header-content">
          <Image src={treeIcon} alt="Tree icon" />
          <div className="tree-card-name">
            <p className="tagline">{species_name}</p>
            <h1> {name} </h1>
          </div>
        </div>

        <Image
          className="toggle-icon"
          style={{
            transform: toggleIconTransformStyle,
            transition: '0.2s',
          }}
          src={openIcon}
          alt="Togle icon"
        />
      </button>
      {image && isSelected && (
        <>
          <Image
            src={image.src}
            width={290}
            height={290}
            alt={image.alt}
            style={{ marginTop: '1rem' }}
          />
        </>
      )}
    </div>
  );
};

export default TreeCard;
