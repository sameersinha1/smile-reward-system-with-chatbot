"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, PartyPopper } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { Modal } from "./ui/modal";

interface GoFundSmilesProps {
  wallet: any;
}

export default function GoFundSmiles({ wallet }: GoFundSmilesProps) {
  const { login, authenticated } = usePrivy();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalFunds, setTotalFunds] = useState("0.00");
  const [userBalance, setUserBalance] = useState("0.00");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* ---------------------------------- */
  /* Demo balances (NO blockchain) */
  /* ---------------------------------- */
  useEffect(() => {
    // DEMO DATA (safe, no wallet, no real money)
    setTotalFunds("12.50");
    setUserBalance("5.00");
  }, []);

  /* ---------------------------------- */
  /* Helpers */
  /* ---------------------------------- */
  const handleMax = () => {
    setAmount(userBalance);
  };

  /* ---------------------------------- */
  /* Demo Donate (NO real transaction) */
  /* ---------------------------------- */
  const handleDonate = async () => {
    if (!amount) return;

    setLoading(true);

    setTimeout(() => {
      setShowSuccessModal(true);
      setAmount("");
      setLoading(false);
    }, 1200);
  };

  /* ---------------------------------- */
  /* Not authenticated */
  /* ---------------------------------- */
  if (!authenticated) {
    return (
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-[#FFE5E5] border-[3px] border-black rounded-lg p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <h3 className="text-3xl font-black mb-4 flex justify-center gap-2">
            <Heart className="text-red-500 animate-pulse" />
            Keep me Alive!
            <Heart className="text-red-500 animate-pulse" />
          </h3>
          <p className="mb-6">Connect your wallet to fund smiles 💖</p>
          <Button onClick={login}>Connect Wallet</Button>
        </div>
      </div>
    );
  }

  /* ---------------------------------- */
  /* Authenticated UI */
  /* ---------------------------------- */
  return (
    <>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-[#FFE5E5] border-[3px] border-black rounded-lg p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-black mb-3 flex justify-center gap-2">
              <Heart className="text-red-500 animate-pulse" />
              Keep me Alive!
              <Heart className="text-red-500 animate-pulse" />
            </h3>

            <p className="mb-3">
              Total Funds Raised: <strong>{totalFunds} USDC</strong>
            </p>
            <p className="text-sm text-gray-600">
              Your Balance: <strong>{userBalance} USDC</strong>
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <Input
              type="number"
              value={amount}
              min="0"
              step="0.01"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="flex-1"
            />
            <Button onClick={handleMax} variant="outline">
              MAX
            </Button>
            <Button onClick={handleDonate} disabled={loading || !amount}>
              {loading ? "Processing..." : "Fund Smiles"}
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center">
          <PartyPopper className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-2xl font-black mb-2">Thank You! 💖</h3>
          <p className="mb-4">
            Your donation helps spread more smiles worldwide!
          </p>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </div>
      </Modal>
    </>
  );
}
