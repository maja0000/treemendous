import { FC } from 'react';
import Image from 'next/image';
import treeIcon from '../assets/tree-icon.svg';
import openIcon from '../assets/close-icon.svg';
import closeIcon from '../assets/open-icon.svg';

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
      <button className="tree-card-header" onClick={onClick}>
        <div>
          <Image src={treeIcon} alt="Tree icon" />
          <div className="tree-card-name">
            <p className="tagline">{species_name}</p>
            <h1> {name} </h1>
          </div>
        </div>

        <Image
          className="toggle-icon"
          src={isSelected ? closeIcon : openIcon}
          alt="Togle icon"
        />
      </button>
      {image && isSelected && (
        <Image
          src={image.src}
          width={290}
          height={290}
          alt={image.alt}
          style={{ marginTop: '1rem' }}
        />
      )}
    </div>
  );
};

export default TreeCard;
