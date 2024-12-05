  export default async function handler(req, res) {
       try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/.netlify/functions/fetchKwh`);
         const data = await response.json();
         res.status(200).json(data);
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     }
     

2. Call the API in your Next.js components or pages:
   javascript
   import { useEffect, useState } from "react";

   export default function Dashboard() {
     const [data, setData] = useState(null);
     const [error, setError] = useState(null);

     useEffect(() => {
       const fetchData = async () => {
         try {
           const res = await fetch("/api/kwh");
           const json = await res.json();
           setData(json);
         } catch (err) {
           setError(err.message);
         }
       };

       fetchData();
     }, []);

     if (error) return <p>Error: {error}</p>;
     if (!data) return <p>Loading...</p>;

     return (
       <div>
         <h1>Total kWh Consumption</h1>
         <p>{data.totalKwh} kWh</p>
       </div>
     );
   }
   


