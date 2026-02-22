class BackAccount {
  private id: string;
  private balance: number;
  public name: string;
  constructor(id: string, balance: number, name: string) {
    this.id = id;
    this.balance = balance;
    this.name = name;
  }

  public checkBalance(): number {
    console.log("Validation");
    console.log("Validation");
    console.log("Validation");

    return this.balance;
  }
}
