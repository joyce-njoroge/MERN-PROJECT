import PropTypes from 'prop-types';

const MemberList = ({ members = [] }) => {
  if (!Array.isArray(members)) {
    return <div>Error: members prop is not an array</div>;
  }

  if (members.length === 0) return <div className="text-gray-600">No members found.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Members List</h2>
      <ul className="space-y-4">
        {members.map(member => (
          <li key={member.id} className="p-4 border border-gray-200 rounded-md">
            <div>
              <strong>ID:</strong> {member.idNumber || 'No ID'}
            </div>
            <div>
              <strong>Name:</strong> {`${member.firstName || 'No first name'} ${member.middleName || ''} ${member.lastName || 'No last name'}`}
            </div>
            <div>
              <strong>Date of Birth:</strong> {member.dateOfBirth || 'No date of birth'}
            </div>
            {member.photo && (
              <div>
                <strong>Photo:</strong>
                <img 
                  src={`data:image/jpeg;base64,${member.photo}`} 
                  alt={`${member.firstName || ''} ${member.lastName || ''}`} 
                  style={{ width: '100px', height: '100px' }} 
                />
              </div>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      middleName: PropTypes.string,
      lastName: PropTypes.string,
      idNumber: PropTypes.string,
      dateOfBirth: PropTypes.string,
      photo: PropTypes.string,  // Expecting base64 encoded string
    })
  ).isRequired,
};

export default MemberList;
