import { useEffect, useState } from 'react';
import { CircleDollarSign, LoaderCircle, Save } from 'lucide-react';
import { adminRequest } from './adminApi.js';

function AdminPricingPage({ token }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    adminRequest('/api/pricing', { token })
      .then((result) => {
        if (!Array.isArray(result.plans) || result.plans.length !== 3) {
          throw new Error('The saved pricing data is incomplete.');
        }
        if (active) setPlans(result.plans);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const updatePlan = (id, field, value) => {
    setPlans((current) =>
      current.map((plan) => plan.id === id ? { ...plan, [field]: value } : plan)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const result = await adminRequest('/api/pricing', {
        token,
        method: 'PUT',
        body: JSON.stringify({ plans }),
      });
      setPlans(result.plans);
      setNotice('Pricing updated. The public pricing page now shows the saved prices.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-table-section">
      {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
      {notice && <div className="admin-alert admin-alert--success" role="status">{notice}</div>}
      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading pricing…</div>
      ) : (
        <form className="admin-pricing-form" onSubmit={handleSubmit}>
          <div className="admin-pricing-intro">
            <span className="admin-pricing-intro__icon"><CircleDollarSign size={20} /></span>
            <div>
              <strong>Pricing page plans</strong>
              <p>Update the price and billing period shown on each public plan card.</p>
            </div>
          </div>
          <div className="admin-pricing-grid">
            {plans.map((plan) => (
              <article className="admin-pricing-card" key={plan.id}>
                <h2>{plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}</h2>
                <label className="admin-field">
                  <span>Price</span>
                  <input
                    required
                    maxLength={40}
                    value={plan.price}
                    onChange={(event) => updatePlan(plan.id, 'price', event.target.value)}
                  />
                </label>
                <label className="admin-field">
                  <span>Billing period</span>
                  <input
                    required
                    maxLength={32}
                    value={plan.period}
                    onChange={(event) => updatePlan(plan.id, 'period', event.target.value)}
                  />
                </label>
              </article>
            ))}
          </div>
          <button className="admin-button admin-button--primary" type="submit" disabled={saving || plans.length !== 3}>
            {saving ? <LoaderCircle className="admin-spin" size={16} /> : <Save size={16} />}
            {saving ? 'Saving pricing…' : 'Save pricing'}
          </button>
        </form>
      )}
    </section>
  );
}

export default AdminPricingPage;
