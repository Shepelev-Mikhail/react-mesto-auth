function InfoTooltip({title, img, onClose}) {
  return(
    <div className={`popup popup_infoTooltip`}>
      <div className="popup__container">
        <img className="popup__image" src={img} alt='' />
        <h2 className="popup__caption" dangerouslySetInnerHTML={{__html: title}}></h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;