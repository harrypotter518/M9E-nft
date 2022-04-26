export const Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className='portfolio-item'>
      <div className='hover-bg'>
        {' '}
        <a
          href={largeImage}
          title={title}
          data-lightbox-gallery='gallery1'
        >
          <img
            src={smallImage}
            className='img-responsive grid-image'
            alt={title}
          />{' '}
        </a>{' '}
      </div>
    </div>
  )
}