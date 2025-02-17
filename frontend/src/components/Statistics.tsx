import axios from "axios";
import { useEffect, useState } from "react";

// frontend/src/components/Statistics.tsx
const Statistics: React.FC = () => {
    const [stats, setStats] = useState<{ [box: number]: number }>({});
    useEffect(() => {
      axios.get('http://localhost:5000/api/flashcards/stats').then(res => setStats(res.data));
    }, []);
    return (
      <div>
        {Object.entries(stats).map(([box, count]) => (
          <div key={box}>Box {box}: {count} cards</div>
        ))}
      </div>
    );
  };