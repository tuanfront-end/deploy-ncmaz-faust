import { ApolloError } from "@apollo/client";
import toast from "react-hot-toast";

export default function errorHandling(error: ApolloError) {
  if (error.networkError) {
    return toast.error("Network error: " + error.networkError);
  } else if (error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    return toast.error("GraphQL error: " + graphQLError);
  } else {
    return toast.error("Error: " + error.message);
  }
}
