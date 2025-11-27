import SearchForm from "./form";
import DisplayDataInTableMode from "./table";

function MainComponent() {
  return (
    <div className="flex flex-col h-full w-full">
      <SearchForm />
      <DisplayDataInTableMode />
    </div>
  );
}

export default MainComponent;
