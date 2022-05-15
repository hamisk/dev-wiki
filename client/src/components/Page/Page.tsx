import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const apiURL = 'http://localhost:4000';

type Props = {};

function Page({}: Props) {
  const [page, setPage] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios.get(apiURL + '/page/' + params.title).then(res => {
      console.log(res.data);
    });
  });
  return <div>Page</div>;
}

export default Page;
