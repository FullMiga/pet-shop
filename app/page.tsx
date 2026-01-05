interface PetProps {
  name: string;
}

function PetComponent({ name }: PetProps) {
  return <div>{name}</div>;
}

export default function Home() {
  return (
    <div>
      <PetComponent name={'Rex'} />
    </div>
  );
}
