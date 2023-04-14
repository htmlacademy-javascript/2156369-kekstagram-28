const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;

const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const smallerButtonControl = document.querySelector('.scale__control--smaller');
const biggerButtonControl = document.querySelector('.scale__control--bigger');

const changeScale = (elem) => {
  elem = parseInt(elem, 10);
  imgPreview.style.transform = `scale(${elem / 100})`;
};

const resetScale = () => {
  imgPreview.style.transform = 'scale(1)';
};

const getScale = () => {
  const scale = parseInt(scaleValue.value, 10);
  return scale;
};

const onBiggerButtonClick = () => {
  if (getScale() !== MAX_SCALE) {
    scaleValue.value = `${getScale() + STEP_SCALE}%`;
    changeScale(scaleValue.value);
  }
};

const onSmallerButtonClick = () => {
  if (getScale() !== MIN_SCALE) {
    scaleValue.value = `${getScale() - STEP_SCALE}%`;
    changeScale(scaleValue.value);
  }
};

smallerButtonControl.addEventListener('click', onSmallerButtonClick);
biggerButtonControl.addEventListener('click', onBiggerButtonClick);

export { resetScale };
