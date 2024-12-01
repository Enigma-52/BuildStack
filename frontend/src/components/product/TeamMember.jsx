const TeamMember = ({ member }) => {
    const { name, role, avatar } = member;
    return (
      <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    );
  };
export default TeamMember;