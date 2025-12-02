import SearchForm from "./form";
import TreeMapGraph from "./graph/treemap";
import DisplayDataInTableMode from "./table";

function MainComponent() {
  // flex - col;
  return (
    <div className="flex flex-col h-full w-full">
      <SearchForm />
      <DisplayDataInTableMode />
      <TreeMapGraph />
    </div>
  );
}

export default MainComponent;
