function InfoTooltip({ title, img, alt, onClose }) {
  return (
    <div className={`popup popup_infoTooltip`}>
      <div className="popup__container popup__container_infoTooltip">
        <img className="popup__image popup__image_infoTooltip" src={img} alt={alt} />
        <h2 className="popup__caption popup__caption_infoTooltip" dangerouslySetInnerHTML={{ __html: title }}></h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;