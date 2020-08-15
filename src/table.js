import React, {useState, useEffect} from "react";
import Tbody from './tbody';

export default function Table () {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageone, setPageOne] = useState(false);
  const [pageend, setPageEnd] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch('https://randomuser.me/api?results=10')
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setUser(data.results);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const gotofirstpage = (cnt) => {
    setLoading(true);
    setPageOne(true);
    setPage(cnt);
    setPageEnd(false);
    fetch(`https://randomuser.me/api?results=10&page=${cnt}`)
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setUser(data.results);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const gotopreviouspage = (cnt) => {
    setPage(cnt);
    setLoading(true);
    if(cnt === 1) {
      setPageOne(true);
    }
    if(cnt !== 10) {
      setPageEnd(false);
    }

    fetch(`https://randomuser.me/api?results=10&page=${cnt}`)
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setUser(data.results);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const gotonextpage = (cnt) => {
    setPage(cnt);
     setLoading(true);
    fetch(`https://randomuser.me/api?results=10&page=${cnt}`)
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setUser(data.results);
      setPageOne(false);
      if (cnt === 10){
        setPageEnd(true);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  const gotolastpage = (cnt) => {
    setPage(cnt);
     setLoading(true);
    fetch(`https://randomuser.me/api?results=10&page=${cnt}`)
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setUser(data.results);
      setPageOne(false);
      if (cnt === 10){
        setPageEnd(true);
      }
    })
    .catch(err => {
      console.log(err);
    });
    setPageEnd(true);
  }

  return (

    <div>
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th> Name </th>
            <th> Gender </th>
          </tr>
        </thead>
        <tbody> 
          <Tbody users={users}/>
        </tbody>
      </table>
      <section>
        <button onClick={() => gotofirstpage(1)} 
                disabled={loading || pageone}> 
            first 
          </button>
        <button onClick={() => gotopreviouspage(page-1)} disabled={loading || pageone}> previous </button>
        <button onClick={() => gotonextpage(page+1)} disabled={loading || pageend}> next </button>
        <button onClick={() => gotolastpage(10)} 
                disabled={loading || pageend}> 
                last 
        </button>
      </section>
    </div>
  );
};