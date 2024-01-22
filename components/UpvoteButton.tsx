import { IconContext } from "react-icons";
import { BiDownvote, BiUpvote } from "react-icons/bi";

enum VoteButtonStatus {
  UPVOTE,
  DOWNVOTE,
  NEUTRAL,
}

interface Props {
  isUpvote: boolean
  status: boolean
  vote: (newStatus: VoteButtonStatus) => void
}

const UpvoteLogo: React.FC<Props> = ({ status, isUpvote, vote }) => {
  return (
    <div>
      <IconContext.Provider
        value={{
          className: `text-[20px] ${status ? "text-red-400" : null}`,
        }}
      >
        {isUpvote ? (
          <BiUpvote></BiUpvote>
        ) : (
          <BiDownvote></BiDownvote>
        )}
      </IconContext.Provider>
    </div>
  );
};

export default UpvoteLogo;
