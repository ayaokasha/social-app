import axios from "axios";
import { useEffect, useState } from "react";

export default function useGet(api) {
  const [apiData, setApiData] = useState([]);
  async function getData() {
    try {
      const { data } = await axios.get(api);
      setApiData(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return apiData;
}
