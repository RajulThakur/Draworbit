
interface Label {
  name: string;
}
export default function Label({name}: Label) {
  return <label className='text-xs tracking-wide capitalize font-medium'>{name} </label>;
}
