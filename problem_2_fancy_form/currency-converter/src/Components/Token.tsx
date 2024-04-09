const Token = ({ token }: { token: string }) => {
  const url = `https://raw.githubusercontent.com/Switcheo/token-icons/555b7b37a0c356864a1aec71bbcf137c5d3ed067/tokens/${token}.svg`;
  return <img src={url} alt={token} />;
};

export default Token;
