import type { Pet } from "../types/models";
import { KEYS, getData, setData } from "./storage";

export async function getPets(): Promise<Pet[]> {
    return (await getData<Pet[]>(KEYS.PETS)) ?? [];
}

export async function getPetsByTutor(tutorId: string): Promise<Pet[]> {
    const pets = await getPets();
    return pets.filter((pet) => pet.tutorId === tutorId);
}

export async function getPetById(petId: string): Promise<Pet | null> {
    const pets = await getPets();
    return pets.find((pet) => pet.id === petId) ?? null;
}

export async function createPet(pet: Pet): Promise<void> {
    const pets = await getPets();
    await setData(KEYS.PETS, [...pets, pet]);
}

export async function updatePet(petAtualizado: Pet): Promise<void> {
    const pets = await getPets();
    const petsAtualizados = pets.map((pet) =>
        pet.id === petAtualizado.id ? petAtualizado : pet,
    );
    await setData(KEYS.PETS, petsAtualizados);
}
