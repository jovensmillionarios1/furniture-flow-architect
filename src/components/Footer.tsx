
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gomob-primary text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gomob-secondary">Contato</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Telefone/Whatsapp</p>
                <p>(49) 99948-2887</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>comercial@gomobplanejados.com.br</p>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gomob-secondary">Endereço</h3>
            <div className="space-y-1">
              <p>Rua Marechal Deodoro, 479D</p>
              <p>Jardim Itália, Chapecó - SC</p>
            </div>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gomob-secondary">Atendimento</h3>
            <div className="space-y-2">
              <div>
                <p className="font-semibold">Segunda a Sexta-feira</p>
                <p>09h às 12h - 13h30 às 18h30</p>
              </div>
              <div>
                <p className="font-semibold">Sábado</p>
                <p>09h às 12h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gomob-secondary mt-8 pt-8 text-center text-sm">
          <p>
            Copyright © 2025 Go.Mob Ambientes Planejados. Todos os direitos reservados. 
            Não é permitido cópia total ou parcial deste site.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
