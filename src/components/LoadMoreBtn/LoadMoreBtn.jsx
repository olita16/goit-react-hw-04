import css from "./LoadMoreBtn.module.css"

function LoadMore({ handleLoadMoreClick }) {
  return (
      <div className={css.container}>
          <button className={css.button} type="button" onClick={handleLoadMoreClick}>
      Load more
    </button>
      </div>

    )
}

export default LoadMore;
