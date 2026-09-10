import { useAuth } from "../context/AuthContext";

export function useSplash() {
    const { carregando } = useAuth();
    return { carregando };
}
