import { EFFECTS } from './data.js';

const slider = document.querySelector('.img-upload__effect-level');
const sliderValue = document.querySelector('.effect-level__value');
const sliderLevel = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const DEFAULT = EFFECTS[0];
let chosenEffect = DEFAULT;

const hideSlider = () => {
  slider.classList.add('hidden');
};

hideSlider();

const showSlider = () => {
  slider.classList.remove('hidden');
};

const isDefault = () => chosenEffect === DEFAULT;

noUiSlider.create(sliderLevel, {
  range: {
    min: DEFAULT.min,
    max: DEFAULT.max,
  },
  start: DEFAULT.max,
  step: DEFAULT.step,
  connect: 'lower'
});

sliderLevel.noUiSlider.on('update', () => {
  sliderValue.value = sliderLevel.noUiSlider.get();
});

const onUpdateSlider = () => {
  sliderLevel.noUiSlider.updateOptions({
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
  const value = sliderLevel.noUiSlider.get();
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
sliderLevel.noUiSlider.on('update', onChangeValueEffect);

const resetEffects = () => {
  chosenEffect = DEFAULT;
  onUpdateSlider();
};

export { resetEffects };
