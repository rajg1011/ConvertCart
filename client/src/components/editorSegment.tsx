import React, { useRef, useState } from "react";
import type { Product } from "../types/type";
import Button from "./button";

const SegmentEditor: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoadingData(true);
      setError(false);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/segments/evaluate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userRules: ref.current?.value }),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(true);
      setResults([]);
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mt-5 mx-auto p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Define Filter Conditions
        </h2>
        <label className="block mb-2 font-semibold">
          Enter filter rules (one per line):
        </label>
        <textarea
          ref={ref}
          rows={8}
          className="w-full border rounded p-3 mb-2 font-mono bg-gray-50  focus:border-blue-400 outline-none"
          placeholder="Enter one rule per line, e.g. price > 5000"
        />
        <div className="mb-4 text-sm text-gray-500">
          <span className="font-medium">Examples:</span> price &gt; 5000,
          category = Smartphones, stock_status = instock
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            type="button"
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {loadingData ? "Loading..." : "Evaluate Filter"}
          </Button>
          <Button
            type="button"
            className="min-w-[200px] bg-gray-200 hover:bg-gray-300"
            onClick={() => (ref.current!.value = "")}
          >
            Reset
          </Button>
        </div>

        <div className="border-t pt-4 text-gray-700 text-sm">
          <span className="font-semibold mr-2">Supported operators:</span>
          {["=", "!=", ">", "<", ">=", "<="].map((operator) => (
            <span className="inline-block bg-gray-100 px-2 py-1 rounded mx-1">
              {operator}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 mx-auto max-w-[50vw] mb-4">
        {results.length > 0 && (
          <pre className="mt-4 p-4  rounded shadow-2xl ">
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded shadow-2xl">
            Error in Loading.. Kindly Refresh the Page
          </div>
        )}
      </div>
    </>
  );
};

export default SegmentEditor;
