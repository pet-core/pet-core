import { useAuth } from "../context/AuthContext";

export function useVetHome() {
    const { usuario } = useAuth();
    return { usuario };
}
