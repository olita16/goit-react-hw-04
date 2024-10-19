
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, description, urls: { small, regular } }, index) => {
        return (
          <li key={`${id}-${index}`} className={css.imageGalleryItem}>
            <ImageCard
              small={small}
              regular={regular}
              description={description}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
