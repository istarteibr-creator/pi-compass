import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface Props {
  open: boolean;
  onAccept: () => void;
}

const ConsentModal = ({ open, onAccept }: Props) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Termo de Consentimento (LGPD)</DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed pt-2">
            Este questionário faz parte de uma pesquisa acadêmica do Mestrado Profissional em
            Propriedade Intelectual e Transferência de Tecnologia para a Inovação (PROFNIT).
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground space-y-3 px-2">
          <p>
            Seus dados individuais serão tratados com <strong className="text-foreground">total sigilo</strong>. Apenas dados
            agregados (estatísticas gerais) serão utilizados na pesquisa.
          </p>
          <p>
            Nenhuma informação pessoal ou empresarial será compartilhada com terceiros. A
            participação é voluntária e você pode encerrar a qualquer momento.
          </p>
          <p>
            Ao clicar em "Concordo e desejo participar", você declara estar ciente e de acordo
            com os termos acima.
          </p>
        </div>
        <DialogFooter className="sm:justify-center pt-2">
          <Button onClick={onAccept} size="lg" className="w-full sm:w-auto">
            Concordo e desejo participar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentModal;
