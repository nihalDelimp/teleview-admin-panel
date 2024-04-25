export const Allcondition = [
  { value: "New", label: "New" },
  { value: "Surplus New", label: "Surplus New" },
  { value: "Used", label: "Used" },
  { value: "Good", label: "Good" },
];

export const AllPhases = [
  { value: "3-phase", label: "3-phase" },
  { value: "Single-phase", label: "Single-phase" },
];
export const TransformerTypes = [
  { value: "Power Transformer", label: "Power Transformer" },
  { value: "Pad Mounted Transformer", label: "Pad Mounted Transformer" },
  { value: "Distribution Transformer", label: "Distribution Transformer" },
  { value: "Zig-Zag Transformer", label: "Zig-Zag Transformer" },
];

export const GeneratorRatings = [
  { value: "Stand By", label: "Stand By" },
  { value: "Continuous", label: "Continuous" },
  { value: "Prime", label: "Prime" },
];
export const GeneratorsManufacturesList = [
  { value: "Cummins", label: "Cummins" },
  { value: "Stamford", label: "Stamford" },
  { value: "Marathon", label: "Marathon" },
  { value: "Caterpillar", label: "Caterpillar" },
  { value: "Newage", label: "Newage" },
  { value: "Kohler", label: "Kohler" },
  { value: "Generac", label: "Generac" },
  { value: "Shindaiwa", label: "Shindaiwa" },
  { value: "Olympian", label: "Olympian" },
];
export const fuelTypes = [
  { value: "Diesel", label: "Diesel" },
  { value: "Natural Gas", label: "Natural Gas" },
  { value: "Propane", label: "Propane" },
];

export const GeneratorTypes = [
  { value: "Standby Duty", label: "Standby Duty" },
  { value: "Continuous Duty", label: "Continuous Duty" },
  { value: "Home Use", label: "Home Use" },
];

export const motorsSizes=[
  {value:"1",label:"1"},
  {value:"2",label:"2"},
  {value:"3",label:"3"},
  {value:"4",label:"4"},
  {value:"5",label:"5"}
]

export const mortorHorsePower=[
  {value:"",label:""},
  {value:"",label:""},
  {value:"",label:""},
  {value:"",label:""},
]

export const addPercentageToSnippets = (array, query) => {
  // console.log(array);
  const queryWords = query.toLowerCase().split(/\W+/);
  console.log(queryWords);

  return array.map((item, index) => {
    const snippetWordsSet = new Set(item.snippet.toLowerCase().split(/\s+/));
    // const snippetWords = Array.from(snippetWordsSet);
    const snippetWords = item.snippet.toLowerCase().split(/\W+/);
    console.log(snippetWords);

    let count = 0;
    let arr = [];

    // Loop through each word in the query
    queryWords.forEach((word) => {
      // If the word is found in the snippet, increment the count
      if (snippetWords.includes(word)) {
        arr.push({ [index]: word });
        count++;
      }
    });

    const percentage = (count / queryWords.length) * 100;
    // console.log((count / queryWords.length) * 100);
    console.log(arr);
    // console.log(queryWords.length);
    console.log((arr.length / queryWords.length) * 100);

    return { ...item, percentage };
  });
};
export function sortByPercentageDescending(arr) {
  // Sort the array in descending order based on the percentage
  arr.sort((a, b) => b.percentage - a.percentage);
  return arr;
}