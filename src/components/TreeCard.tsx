import { FC } from 'react';
import Image from 'next/image';

type TreeCardProps = {
  name: string;
  species_name: string;
  image: {
    src: string;
    alt: string;
  };
};

const TreeCard: FC<TreeCardProps> = ({
  name,
  species_name,
  image,
}) => {
  return (
    <div>
      {name}
      {species_name}
      {image && (
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
