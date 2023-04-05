import { EFFECTS } from './constants.js';

const sliderElement = document.querySelector('.img-upload__effect-level');
const sliderValue = sliderElement.querySelector('.effect-level__value');
const sliderLevel = sliderElement.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const DEFAULT = EFFECTS[0];
let chosenEffect = DEFAULT;

const hideSlider = () => sliderElement.classList.add('hidden');

hideSlider();

const showSlider = () => sliderElement.classList.remove('hidden');

const isDefault = () => chosenEffect === DEFAULT;

const slider = noUiSlider.create(sliderLevel, {
  range: {
    min: chosenEffect.min,
    max: chosenEffect.max,
  },
  start: chosenEffect.max,
  step: chosenEffect.step,
  connect: 'lower'
});

slider.on('update', () => {
  sliderValue.value = slider.get();
});

const onUpdateSlider = () => {
  slider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onChangeValueEffect = () => {
  const value = slider.get();
  uploadPreviewImg.style.filter = isDefault() ?
    DEFAULT.style :
    `${chosenEffect.style}(${value}${chosenEffect.unit})`;
  sliderValue.value = value;
};

const onChangeEffect = (evt) => {
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  uploadPreviewImg.className = `effects__preview--${chosenEffect.name}`;
  onUpdateSlider();
};

effects.addEventListener('change', onChangeEffect);
slider.on('update', onChangeValueEffect);

const resetEffects = () => {
  chosenEffect = DEFAULT;
  onUpdateSlider();
};

export { resetEffects };
