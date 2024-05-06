import { mount } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

describe('PokemonOptions Component', () => {
  test('Should render buttons with the correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: false, correctAnswer: 1 },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(options.length);

    buttons.forEach((button, i) => {
      expect(button.attributes('class')).toBe(
        'capitalize disabled:shadow-none disabled:bg-gray-100',
      );
      expect(button.text()).toBe(options[i].name);
    });
  });

  test('Should emit selectedOption event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: false, correctAnswer: 1 },
    });

    const [button1, button2, button3] = wrapper.findAll('button');

    await Promise.all([
      button1.trigger('click'),
      button2.trigger('click'),
      button3.trigger('click'),
    ]);

    expect(wrapper.emitted().selectedOption).toBeTruthy();
    expect(wrapper.emitted().selectedOption[0]).toEqual([1]);
    expect(wrapper.emitted().selectedOption[1]).toEqual([2]);
    expect(wrapper.emitted().selectedOption[2]).toEqual([3]);
  });

  test('should disable the buttons when blockSelection is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: true, correctAnswer: 1 },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      const attributes = Object.keys(button.attributes());
      expect(attributes).toContain('disabled');
    });
  });

  test('Should apply correct styling to buttons based on the correct/incorrect answer', () => {
    const correctAnswer = 2;
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: true, correctAnswer },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button, index) => {
      if (options[index].id === correctAnswer) {
        expect(button.classes()).toContain('correct');
      } else {
        expect(button.classes()).toContain('incorrect');
      }
    });
  });
});
