using MuHASS.ViewModels;
using System.ComponentModel;
using Xamarin.Forms;

namespace MuHASS.Views
{
  public partial class ItemDetailPage : ContentPage
  {
    public ItemDetailPage()
    {
      InitializeComponent();
      BindingContext = new ItemDetailViewModel();
    }
  }
}