import { WarningCircle } from "@phosphor-icons/react";


function ErrorList() {
  const errorData = [
    { errName: 'Error 1', errDescription: 'This is the first error' },
    { errName: 'Error 2', errDescription: 'This is the second error' },
    { errName: 'Error 3', errDescription: 'This is the third error ' },
  ];

  return (
    <div>
      <p>{errorData.length} error(s) in conversation.</p>
      <div>
        {errorData.map((error, index) => (
          <ErrorCard key={index} errName={error.errName} errDescription={error.errDescription} />
        ))}
      </div>
    </div>
  );
}

export default ErrorList;


function ErrorCard(props: any) {
  return (
    <div className={"rounded-xl drop-shadow-lg border-slate-950 bg-white p-4 mt-2 mb-4"}>
        <WarningCircle className="inline-block mr-1 -mt-1" size={20} fill="#904bff"/>
        <h6 className={"font-semibold text-purple-600 inline-block"}>{props.errName}</h6>
        <p className={"text-purple-600 ml-6"}>{props.errDescription}</p>
    </div>
  );
}
