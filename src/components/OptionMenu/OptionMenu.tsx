import { useSelection } from '@/context/selectionContext';
import { getShapes, mutateShape, saveShapes, updateShape } from '@/helper/storage';
import { Shape } from '@/types/shape';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  CopyIcon,
  Trash2
} from 'lucide-react';
import Container from './Container';
import Label from './Label';
import OptionsContainer from './Options';
import Row from './Row';
import Slider from './Slider';

export default function OptionMenu() {
  const {
    selectedShape,
    showOptionMenu,
    updateSelectedShape,
    setSelectedShape,
    setShowOptionMenu,
  } = useSelection();

  if (!showOptionMenu || !selectedShape) return null;

  const getTextWithDefaults = () => {
    const base = selectedShape.text || {
      value: '',
      fontSize: 'md' as const,
      fontFamily: 'Arial',
      fontStyle: 'normal' as const,
    };
    return base;
  };

  const handleColorChange = (color: string) => {
    console.log('[OptionMenu.colorClick]', { id: selectedShape.id, color });
    updateSelectedShape({ color });
    mutateShape(selectedShape.id, s => ({ ...s, color }));
  };

  const handleOpacityChange = (opacity: number) => {
    updateSelectedShape({ opacity });
    updateShape(selectedShape.id, { opacity });
  };

  const handleDelete = () => {
    const shapes = getShapes();
    const updatedShapes = shapes.filter((shape: Shape) => shape.id !== selectedShape.id);
    saveShapes(updatedShapes);
    setSelectedShape(null);
    setShowOptionMenu(false);
  };

  // const handleCopy = () => {
  //   if (!selectedShape) return;
  //   const clone: Shape = {
  //     ...selectedShape,
  //     id: crypto.randomUUID(),
  //     x: selectedShape.x + 10,
  //     y: selectedShape.y + 10,
  //     isSelected: true,
  //   };
  //   // Deselect previous selection and append clone
  //   const shapes = getShapes().map(s => ({ ...s, isSelected: false }));
  //   saveShapes([...shapes, clone]);
  //   setSelectedShape(clone);
  //   updateSelectedShape(clone);
  //   setShowOptionMenu(true);
  // };
  return (
    <div className='fixed top-1/6 left-4 z-20 grid max-w-[13rem] grid-cols-1 gap-y-4 rounded-lg bg-slate-900 p-3 select-none'>
      <Container>
        <Label name='Stroke' />
        <Row>
          <OptionsContainer
            style='secondary'
            className={`bg-white ${selectedShape.color === '#ffffff' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#ffffff')}
          />
          <OptionsContainer
            style='secondary'
            className={`bg-slate-950 ${selectedShape.color === '#0f172a' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#0f172a')}
          />
          <OptionsContainer
            style='secondary'
            className={`bg-amber-400 ${selectedShape.color === '#fbbf24' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#fbbf24')}
          />
          <OptionsContainer
            style='secondary'
            className={`bg-blue-400 ${selectedShape.color === '#60a5fa' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#60a5fa')}
          />
          <OptionsContainer
            style='secondary'
            className={`bg-red-400 ${selectedShape.color === '#f87171' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#f87171')}
          />
          <OptionsContainer
            style='secondary'
            className={`bg-green-400 ${selectedShape.color === '#4ade80' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#4ade80')}
          />
          <OptionsContainer
            style='secondary'
            className={`bg-purple-400 ${selectedShape.color === '#a78bfa' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => handleColorChange('#a78bfa')}
          />
        </Row>
      </Container>
      {/* Only show typography options for text shapes */}
      {/* <Container>
        <Label name='Font family' />
        <Row>
          <OptionsContainer>
            <Pen size={16} strokeWidth={1.4} />
          </OptionsContainer>
          <OptionsContainer>
            <Type size={16} strokeWidth={1.4} />
          </OptionsContainer>
          <OptionsContainer>
            <CodeXml size={16} strokeWidth={1.4} />
          </OptionsContainer>
        </Row>
      </Container> */}
      {selectedShape.type === 'text' && (
        <>
          <Container>
            <Label name='font size' />
            <Row>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, fontSize: 'sm' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, fontSize: 'sm' } }));
              }}>S</OptionsContainer>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, fontSize: 'md' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, fontSize: 'md' } }));
              }}>M</OptionsContainer>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, fontSize: 'lg' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, fontSize: 'lg' } }));
              }}>L</OptionsContainer>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, fontSize: 'xl' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, fontSize: 'xl' } }));
              }}>XL</OptionsContainer>
            </Row>
          </Container>
          <Container>
            <Label name='text align' />
            <Row>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, align: 'left' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, align: 'left' } }));
              }}>
                <AlignLeft size={16} strokeWidth={1.4} />
              </OptionsContainer>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, align: 'center' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, align: 'center' } }));
              }}>
                <AlignCenter size={16} strokeWidth={1.4} />
              </OptionsContainer>
              <OptionsContainer onClick={() => {
                const base = getTextWithDefaults();
                updateSelectedShape({ text: { ...base, align: 'right' } });
                mutateShape(selectedShape.id, s => ({ ...s, text: { ...base, align: 'right' } }));
              }}>
                <AlignRight size={16} strokeWidth={1.4} />
              </OptionsContainer>
            </Row>
          </Container>
        </>
      )}
      <Container>
        <Label name='opacity' />
        <Row>
          <Slider
            value={selectedShape.opacity || 100}
            onChange={(val) => {
              console.log('[OptionMenu.opacitySlide]', { id: selectedShape.id, val });
              updateSelectedShape({ opacity: val });
              mutateShape(selectedShape.id, s => ({ ...s, opacity: val }));
            }}
          />
        </Row>
      </Container>
      <Container>
        <Label name='stroke width' />
        <Row>
          <Slider
            value={selectedShape.strokeWidth || 2}
            onChange={(val) => {
              console.log('[OptionMenu.strokeSlide]', { id: selectedShape.id, val });
              updateSelectedShape({ strokeWidth: val });
              mutateShape(selectedShape.id, s => ({ ...s, strokeWidth: val }));
            }}
          />
        </Row>
      </Container>
      <Container>
        <Label name='actions' />
        <Row>
          <OptionsContainer onClick={handleDelete}>
            <Trash2 size={16} strokeWidth={1.4} />
          </OptionsContainer>
          {/* <OptionsContainer onClick={handleCopy}>
            <CopyIcon size={16} strokeWidth={1.4} />
          </OptionsContainer> */}
        </Row>
      </Container>
    </div>
  );
}
