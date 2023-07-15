import { createClient } from 'contentful';
import { useState, useEffect } from 'react';

const client = createClient({
  space: 'y53pdf5w5m9g',
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
});

// custom hook
const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' });

      const projectsArr = response.items.map((item) => {
        const { title, url } = item.fields;
        const { url: image } = item.fields?.image?.fields?.file;
        const { id } = item.sys;
        return { title, url, image, id };
      });

      setProjects(projectsArr);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, projects };
};

export default useFetchProjects;
