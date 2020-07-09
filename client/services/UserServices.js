const baseURL = "http://localhost:3000/api/shares/"

export default {
  getData() {
    return fetch(baseURL).then(res => res.json());
  },
  async updateUserData(id, payload) {
    const updatedShares = await fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    return updatedShares.json();
  }
}
