import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  CodeXml,
  Pen,
  Trash2,
  Type,
} from 'lucide-react';
import Container from './Container';
import Label from './Label';
import OptionsContainer from './Options';
import Row from './Row';
import Slider from './Slider';

export default function OptionMenu({showMenu=false}:{showMenu:boolean}) {
  if(!showMenu) return;
  return (
    <div className="fixed left-4 z-20 grid grid-cols-1 gap-y-3.5 top-1/6 rounded-lg bg-slate-900 p-3 select-none">
      <Container>
        <Label name="Stroke" />
        <Row>
          <OptionsContainer
            style="secondary"
            className="bg-white"
          />
          <OptionsContainer
            style="secondary"
            className="bg-slate-950"
          />
          <OptionsContainer
            style="secondary"
            className="bg-amber-400"
          />
          <OptionsContainer
            style="secondary"
            className="bg-blue-400"
          />
          <OptionsContainer
            style="secondary"
            className="bg-red-400"
          />
          <OptionsContainer
            style="secondary"
            className="bg-green-400"
          />
          <OptionsContainer
            style="secondary"
            className="bg-purple-400"
          />
        </Row>
      </Container>
      <Container>
        <Label name="Font family" />
        <Row>
          <OptionsContainer>
            <Pen
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
          <OptionsContainer>
            <Type
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
          <OptionsContainer>
            <CodeXml
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
        </Row>
      </Container>
      <Container>
        <Label name="font size" />
        <Row>
          <OptionsContainer>S</OptionsContainer>
          <OptionsContainer>M</OptionsContainer>
          <OptionsContainer>L</OptionsContainer>
          <OptionsContainer>XL</OptionsContainer>
        </Row>
      </Container>
      <Container>
        <Label name="text align" />
        <Row>
          <OptionsContainer>
            <AlignLeft
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
          <OptionsContainer>
            <AlignCenter
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
          <OptionsContainer>
            <AlignRight
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
        </Row>
      </Container>
      <Container>
        <Label name="opacity" />
        <Row>
          <Slider />
        </Row>
      </Container>
      <Container>
        <Label name="actions" />
        <Row>
          <OptionsContainer>
            <Trash2
              size={16}
              strokeWidth={1.4}
            />
          </OptionsContainer>
        </Row>
      </Container>
    </div>
  );
}
