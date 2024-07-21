import { useState, useEffect } from 'react';
import axios from 'axios';
import MemberList from '../components/MemberList';
import MemberForm from '../components/MemberForm';

const MemberPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwt_token');
        if (!token) {
          setError('Token not found');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get('http://localhost:5000/api/members', config);
        if (Array.isArray(res.data)) {
          setMembers(res.data);
        } else {
          setError('API response is not an array');
        }
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const addMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  if (loading) return <div>Loading members...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <MemberForm addMember={addMember} />
      <MemberList members={members} />
    </div>
  );
};

export default MemberPage;
