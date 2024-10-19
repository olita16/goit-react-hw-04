import { useState, useEffect } from "react";
import SearchBar from "../Searchbar/Searchbar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import { renderPhoto } from "../../unsplashApi"; 
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [state, setState] = useState({
    images: [],
    action: "",
    error: null,
    page: 1,
    loading: false,
    isEmpty: false,
    nextPage: false,
    modal: { isOpen: false, imgUrl: "", imgAlt: "" },
  });

  const handleSubmit = (searchValue) => {
    setState({
      ...state,
      action: searchValue,
      images: [],
      page: 1,
      nextPage: false,
      isEmpty: false,
      error: null,
    });
  };


  useEffect(() => {
    if (!state.action) return;

    const fetchImages = async () => {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      try {
        const { results, total, total_pages } = await renderPhoto(
          state.action,
          state.page
        );

        if (results.length === 0) {
          setState((prevState) => ({ ...prevState, isEmpty: true }));
          toast("No images found!", {
            duration: 3000,
            position: "top-center",
            style: { marginTop: 100 },
          });
          return;
        }

        setState((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...results],
          nextPage: state.page < total_pages,
        }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error: error.message }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchImages();
  }, [state.action, state.page]);


  const handleLoadMoreClick = () => {
    setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
  };


  const openModal = (url, alt, author, likes) => {
    setState((prevState) => ({
      ...prevState,
      modal: { isOpen: true, imgUrl: url, imgAlt: alt, author, likes },
    }));
  };


  const closeModal = () => {
    setState((prevState) => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        isOpen: false,
        imgUrl: "",
        imgAlt: "",
        author: "",
        likes: 0,
      },
    }));
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />

      {state.images.length > 0 && (
        <ImageGallery images={state.images} openModal={openModal} />
      )}

      {state.nextPage && (
        <LoadMoreBtn handleLoadMoreClick={handleLoadMoreClick} />
      )}

      {state.error && <ErrorMessage message={state.error} />}

      {state.loading && <Loader />}

      {state.isEmpty && <Toaster />}

      <ImageModal
        isOpen={state.modal.isOpen}
        onClose={closeModal}
        largeImageURL={state.modal.imgUrl}
        tags={state.modal.imgAlt}
      />
    </div>
  );
}

export default App;
